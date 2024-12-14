import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import "survey-core/defaultV2.min.css";
import { Icon} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import "../App.css";
const QuestionFormComp=({surveyJSON,setSurveyJson})=>{
    const handleSurveyClose=()=>{
        setSurveyJson(null);
    }
    return (
       <div className="survey-create-form-container">
            <button onClick={handleSurveyClose} className="close-btn-question-form">
                <Icon icon={IconNames.CROSS} />
            </button>
            {surveyJSON && (
                <Survey model={new Model(surveyJSON)}  />
            )}
       </div>
    )
}
export default QuestionFormComp;