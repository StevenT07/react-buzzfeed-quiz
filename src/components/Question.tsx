import { FC, useRef, memo, useState } from "react";
import { ScrollElement } from "react-scroll";
import { useResizeDetector } from "react-resize-detector";
import TextFit from "../TextFit";
import QuestionType from "../interfaces/Question/question.interface";
import QuestionProps from "../interfaces/Question/question_props.interface";
import ListItemContainerElementProps from "../interfaces/Question/list_item.interface";
import Answers from "./Answers";
import QuestionResponse from "./QuestionResponse";

// Memoization important to keep entire quiz from re-rendering upon every answer selection
const Question: FC<QuestionProps> = memo(
  ({
    item,
    questionIndex,
    generalBackgroundColor,
    generalFontColor,
    resultsAvailable,
    onAnswerSelection,
  }) => {
    const [selectedAnswerResponse, changeSelectedAnswerResponse] = useState<{
      title?: string | JSX.Element;
      description?: string | JSX.Element;
      image?: string;
      imageAttribution?: string;
    }>({
      title: "",
      description: "",
      image: "",
      imageAttribution: "",
    });
    const { height, width, ref: resizeRef } = useResizeDetector();

    const renderOverlapText = (item: QuestionType) => {
      if (item.questionRelativeToImage !== "adjacent") {
        return (
          <TextFit
            className={`rbq_question_overlap_text ${
              item.backgroundImageSrc ? "rbq_question_with_bg_image" : ""
            }`}
            min={height ? (height < 345 ? 25 : 50) : 50}
            max={height ? (height < 345 ? 80 : 118) : 118}
            capAt={80}
            style={{
              color: item.fontColor
                ? item.fontColor
                : generalFontColor
                ? generalFontColor
                : "#fff",
            }}
            outerContainerWidth={width}
            question={true}
          >
            {item.question ? item.question : null}
          </TextFit>
        );
      } else {
        return null;
      }
    };

    let listItemContainerRef = useRef(null);

    const ListItemContainerElement: FC<ListItemContainerElementProps> = (
      elProps
    ) => {
      const customAttr = { name: elProps.name };

      return (
        <li
          {...customAttr}
          className={elProps.className}
          ref={listItemContainerRef}
        >
          {elProps.children}
        </li>
      );
    };

    const ListItemContainerScrollElement = ScrollElement(
      ListItemContainerElement
    );

    return (
      <ListItemContainerScrollElement
        className={`rbq_list_item_container rbq_question ${
          questionIndex === 0 ? "rbq_first_question" : ""
        }`}
        name={`Question${questionIndex}`}
        key={`Question${questionIndex}`}
      >
        {item.questionRelativeToImage === "adjacent" && (
          <h2
            className="rbq_question_adjacent_text"
            style={{
              color: item.fontColor
                ? item.fontColor
                : generalFontColor
                ? generalFontColor
                : "#000",
            }}
          >
            {item.question ? item.question : null}
          </h2>
        )}
        {item.backgroundImageSrc ? (
          <div
            className={`rbq_question_image_container ${
              item.questionRelativeToImage === "adjacent"
                ? "rbq_question_adjacent_to_image"
                : ""
            } ${item.imageAttribution ? "rbq_image_attribution" : ""}`}
            ref={resizeRef}
          >
            <img
              className="rbq_question_image"
              src={item.backgroundImageSrc}
              alt={`Question ${questionIndex} Image`}
            />
            {renderOverlapText(item)}
          </div>
        ) : (
          <div
            className={`rbq_question_inner_container ${
              item.questionRelativeToImage === "adjacent"
                ? "rbq_question_adjacent_to_image"
                : ""
            } `}
            style={{
              background: item.backgroundColor
                ? item.backgroundColor
                : generalBackgroundColor
                ? generalBackgroundColor
                : "#000",
            }}
            ref={resizeRef}
          >
            {renderOverlapText(item)}
          </div>
        )}
        {item.backgroundImageSrc && item.imageAttribution ? (
          <p className="rbq_question_image_attribution_text">
            <i>{item.imageAttribution}</i>
          </p>
        ) : null}
        {item.answers &&
          (Array.isArray(item.answers) && item.answers.length > 0 ? (
            <>
              <Answers
                item={item}
                questionIndex={questionIndex}
                resultsAvailable={resultsAvailable}
                onAnswerSelection={onAnswerSelection}
                generalBackgroundColor={generalBackgroundColor}
                generalFontColor={generalFontColor}
                changeSelectedAnswerResponse={changeSelectedAnswerResponse}
              />
              <QuestionResponse
                questionIndex={questionIndex}
                title={selectedAnswerResponse.title}
                description={selectedAnswerResponse.description}
                image={selectedAnswerResponse.image}
                imageAttribution={selectedAnswerResponse.imageAttribution}
              />
            </>
          ) : null)}
      </ListItemContainerScrollElement>
    );
  }
);

export default Question;
