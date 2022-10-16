// Use this file to implement the quiz view.

import React from 'react';
import MarkdownTextView from './Components/MarkdownTextView';
import { Question, QuizMetadata } from './Data Structures';
import './QuizView.css'
import './quizdesign.json'

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

                    <div style={{padding: '10px', margin: '10px 0', border: '1px dashed lightgray'}}>
                        <p> Which computer languages have you used?</p>
                        <p>{'\t'}<input type="checkbox" name="langs" value="JavaScript"/>JavaScript</p>
                        <p>{'\t'}<input type="checkbox" name="langs" value="Java"/>Java</p>
                        <p>{'\t'}<input type="checkbox" name="langs" value="C"/>C</p>
                        <p>{'\t'}<input type="checkbox" name="langs" value="Python"/>Python</p>
                        <p>{'\t'}<input type="checkbox" name="langs" value="Ook"/>Ookt</p>
                        <p>{'\t'}<input type="checkbox" name="langs" value="LISP"/>LISP</p>
{/* 
                        <ul> Which computer languages have you used?
                        <li><input type="checkbox" name="langs" value="JavaScript"/>JavaScript</li>
                        <li>Tea</li>
                        <li>Milk</li>
                        </ul> */}



                    </div>
                
                {questions}
            </div>

        )
    }
}
 
export default QuizView;