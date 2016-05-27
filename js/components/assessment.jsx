import React from 'react';
import update from'react-addons-update'
import QuestionSlide  from './question-slide.jsx'
import Results  from './results.jsx'
import questions from '../question-text.js'

var Assessment = React.createClass({

  getInitialState: function() {
    return {
      remainingQuestions: questions,
      answeredQuestions: [],
      score: []
    }
  },

  handleNext: function(selection) {
    this.setState({answeredQuestions: update(this.state.answeredQuestions, {$push: [this.state.remainingQuestions[0]]})});
    this.setState({remainingQuestions: update(this.state.remainingQuestions, {$splice: [[0, 1]]})});
    this.setState({score: update(this.state.score, {$unshift: [parseInt(selection)]})});
  },

  handleBack: function() {
    var lastAnswered = this.state.answeredQuestions.pop();
    var lastScore = this.state.score.shift();
    this.setState({answeredQuestions: update(this.state.answeredQuestions, {$splice: [[this.state.answeredQuestions.length, 1]]})});
    this.setState({remainingQuestions: update(this.state.remainingQuestions, {$unshift: [lastAnswered]})});
    this.setState({score: update(this.state.score, {$splice: [[0, 1]]})});
  },

  displayContent: function() {
    if (this.state.remainingQuestions.length < 1) {
      return <Results score={this.state.score} />
    } else {
      return <QuestionSlide question={this.state.remainingQuestions[0]} handleNext={this.handleNext}/>;
    }
  },

  displayBackButton: function() {
    if (this.state.answeredQuestions.length > 0 && this.state.remainingQuestions.length > 0) {
      return <button id="back-button" onClick={this.handleBack}>Back</button>
    }
  },
  
  render: function(){
    return (
     <div id="assessment">
     <div className="title">Quartet PHQ-9 Depression Assessment</div>
      {this.displayContent()}
      {this.displayBackButton()}
     </div>
    )
  }
});

export default Assessment;
