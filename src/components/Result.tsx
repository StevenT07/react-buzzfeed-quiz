import { FC, useMemo } from "react";
import ResultProps from "../interfaces/Result/result_props.interface";
import { Element } from "react-scroll";
import FacebookButton from "./ShareButtons/FacebookButton";
import TwitterButton from "./ShareButtons/TwitterButton";
import CopyLinkButton from "./ShareButtons/CopyLinkButton";

const Result: FC<ResultProps> = (props) => {
  const {
    title,
    resultsAvailable,
    finalResult,
    facebookShareButton,
    facebookShareLink,
    twitterShareButton,
    twitterShareLink,
    twitterShareText,
    twitterShareHashtags,
    copyShareButton,
    copyShareLink,
    shareLinkClicked,
    changeShareLinkClicked,
    shareLinkAnimatingOut,
    changeShareLinkAnimatingOut,
    scrollFunction,
    changeResultsAvailable,
    changeSelectedAnswers,
    changeFinalResult,
    onResult,
    onRestart,
  } = props;

  const handleRetakeQuiz = () => {
    scrollFunction("Top", -2);
    changeResultsAvailable(false);
    changeSelectedAnswers([]);
    changeFinalResult([]);

    if (shareLinkClicked) {
      changeShareLinkClicked(false);
    }

    if (shareLinkAnimatingOut) {
      changeShareLinkAnimatingOut(false);
    }

    if (onRestart) {
      if (typeof onRestart === "function") {
        onRestart();
      }
    }
  };

  useMemo(() => {
    const generalOnResultFunction = () => {
      if (onResult) {
        if (typeof onResult === "function") {
          onResult();
        }
      }
    };

    if (resultsAvailable && finalResult.length > 0) {
      if (i.onResult) {
        if (typeof i.onResult === "function") {
          i.onResult();
        } else {
          generalOnResultFunction();
        }
      } else {
        generalOnResultFunction();
      }
    }
  }, [resultsAvailable, finalResult, onResult]);

  if (resultsAvailable && finalResult.length > 0) {
    return (
      finalResult.map(function(i){
        return (
          <Element className="rbq_result_outer_container" name="Result">
          <div className="rbq_result_header">
            <h2>{title}</h2>
          </div>
          <div className="rbq_result_inner_container">
            <div className="rbq_result_inner_description_container">
              <h3 className="rbq_result_inner_description_header">
                {i.title}
              </h3>
              <p className="rbq_result_inner_description">
                {i.description}
              </p>
            </div>
            {i.resultImageSrc && (
              <div className="rbq_result_inner_image_container">
                <img
                  className="rbq_result_inner_image"
                  alt="Buzzfeed Quiz Result Image"
                  src={i.resultImageSrc}
                />
                {i.imageAttribution ? (
                  <span className="rbq_result_attribution_text">
                    {i.imageAttribution}
                  </span>
                ) : null}
              </div>
            )}
          </div>
          <div className="rbq_result_footer">
            <button className="rbq_retake_quiz_button" onClick={handleRetakeQuiz}>
              Retake
            </button>
            <ul className="rbq_share_links_list" aria-label="share">
              {copyShareButton && (
                <CopyLinkButton
                  shareLinkClicked={shareLinkClicked}
                  changeShareLinkClicked={changeShareLinkClicked}
                  shareLinkAnimatingOut={shareLinkAnimatingOut}
                  copyShareLink={copyShareLink}
                />
              )}
              {twitterShareButton && (
                <TwitterButton
                  twitterShareLink={twitterShareLink}
                  twitterShareText={twitterShareText}
                  twitterShareHashtags={twitterShareHashtags}
                />
              )}
              {facebookShareButton && (
                <FacebookButton facebookShareLink={facebookShareLink} />
              )}
            </ul>
          </div>
        </Element>
        )
      })
    );
  } else {
    return null;
  }
};

export default Result;
