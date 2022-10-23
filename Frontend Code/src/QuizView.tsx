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


                    <div className='multi-select'>
                        <h3>Which computer languages have you used?</h3>
                            <div className='multi-choices'> 
                            <div className='multi-options'>
                                <label className='multi-option'><input type="checkbox" name="langs" value="JavaScript"/><span className="checkmark"></span>JavaScript</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="Java"/><span className="checkmark"></span>Java</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="C"/><span className="checkmark"></span>C</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="Python"/><span className="checkmark"></span>Python</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="Ook"/><span className="checkmark"></span>Ookt</label>
                                <label className='multi-option'><input type="checkbox" name="langs" value="LISP"/><span className="checkmark"></span>LISP</label>
                            </div>
                            </div>
                    </div>

                    {/* <div className='multi-select'>

                    <div className="row"> 
                    <div className="col-12"> 
                        <p className="fw-bold"> Which computer languages have you used? </p>
                            <div className='multi-choices'> </div>
                            <input type="checkbox" name="langs" id="one" value="JavaScript"/>
                            <input type="checkbox" name="langs" id="two" value="Java"/>
                            <input type="checkbox" name="langs" id="three" value="C"/>
                            <input type="checkbox" name="langs" id="four" value="Python"/>
                            <input type="checkbox" name="langs" id="five" value="Ook"/>
                            <input type="checkbox" name="langs" id="six" value="LISP"/>

                            <label htmlFor="one" className="box first"> 
                            <div className="course"> <span className="circle"></span> <span className="subject"> JavaScript </span> </div> 
                            </label> 

                            <label htmlFor="two" className="box first"> 
                            <div className="course"> <span className="circle"></span> <span className="subject"> Java </span> </div> 
                            </label> 

                            <label htmlFor="three" className="box first"> 
                            <div className="course"> <span className="circle"></span> <span className="subject"> C </span> </div> 
                            </label> 

                            <label htmlFor="four" className="box first"> 
                            <div className="course"> <span className="circle"></span> <span className="subject"> Python </span> </div> 
                            </label> 

                            <label htmlFor="five" className="box first"> 
                            <div className="course"> <span className="circle"></span> <span className="subject"> Ook </span> </div> 
                            </label> 

                            <label htmlFor="six" className="box first"> 
                            <div className="course"> <span className="circle"></span> <span className="subject"> LISP </span> </div> 
                            </label>
                    </div> 
                    </div> 
                    </div> */}
                
                {questions}
            </div>



        )
    }
}
 
export default QuizView;