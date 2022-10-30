// Use this file to implement the quiz view.

import React from 'react';
import MarkdownTextView from './Components/MarkdownTextView';
import { Question, QuizMetadata } from './Data Structures';
import './QuizView.css'
import './quizdesign.json'
// import {useState} from 'react';

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
                        <h3 className='question-title'>Which computer languages have you used?</h3>
                            <div className='multi-options'>

                            <input type="checkbox" className='multi-checked' name="langs" value="JavaScript" id='multi-check-1'/>
                            <label className='multi-option' htmlFor='multi-check-1'><span>JavaScript</span></label>
                        
                            <input type="checkbox" className='multi-checked' name="langs" value="Java" id='multi-check-2'/>
                            <label className='multi-option' htmlFor='multi-check-2'><span>Java</span></label>

                            <input type="checkbox" className='multi-checked' name="langs" value="C" id='multi-check-3'/>
                            <label className='multi-option' htmlFor='multi-check-3'><span>C</span></label>

                            <input type="checkbox" className='multi-checked' name="langs" value="Python" id='multi-check-4'/>
                            <label className='multi-option' htmlFor='multi-check-4'><span>Python</span></label>

                            </div>

                        <button className="button-multiselect-submit">Submit</button>

                        <p className='multi-select-indicator'>Select Multiple Options</p>




                    </div>
                {questions}
            </div>
        )
    }
}
 
export default QuizView;