// Use this file to implement the quiz view.

import React from 'react';
import MarkdownTextView from './Components/MarkdownTextView';
import { Question, QuizMetadata } from './Data Structures';
import './QuizView.css'
import './quizdesign.json'
import {useState} from 'react';

interface QuizViewProps {
    metadata: QuizMetadata
    questions: Question[]
}
 
interface QuizViewState {
    // Gives the unix timestamp of the user's starting time.
    quizStartTime?: number

    /* Define more state variables as needed */
}
 
class QuizView extends React.Component<QuizViewProps, QuizViewState> {
    constructor(props: QuizViewProps) {
        super(props);
        this.state = {
            
        };
       
    }
    
    render() {

        // Here is an example of how you can insert a variable number of elements into a page
        let questions: JSX.Element[] = []

        for (let i = 0; i < 10; i++) {
            questions.push(<div style={{padding: '10px', margin: '10px 0', border: '1px dashed lightgray'}}>{`Example question ${i+1}`}</div>)
        }

        return (
            <div className='quiz-container'>
                <h2 className='quiz-title'><MarkdownTextView rawText={this.props.metadata.quiz_title} /></h2>
                <MarkdownTextView rawText={this.props.metadata.quiz_subtitle || undefined} />
                    <div className='multi-select'>
                        <h3>Which computer languages have you used?</h3>
                            <div className='multi-options'>
                                <label className='multi-option'><input type="checkbox" name="langs" value="JavaScript"/><span className="checkmark"></span>JavaScript</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="Java"/><span className="checkmark"></span>Java</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="C"/><span className="checkmark"></span>C</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="Python"/><span className="checkmark"></span>Python</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="Ook"/><span className="checkmark"></span>Ookt</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="LISP"/><span className="checkmark"></span>LISP</label>
                            </div>
                    </div>
                {questions}
            </div>



        )
    }
}
 
export default QuizView;