// import {
//   iMatchOption,
//   iMatchQuestion,
//   iMultipleQuestion,
//   iQuestion,
//   iRegularOption,
//   iSimpleQuestion,
//   iWrittenQuestion,
// } from "../types";

// import { questionTypes } from "../types";

// const changeQuestionTextInput = (
//   arr: iQuestion[],
//   quesId: number,
//   quesType: questionTypes,
//   text: string
// ) => {
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == quesType) {
//       return {
//         ...ques,
//         question: text,
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const changeQuestionImgURL = (
//   arr: iQuestion[],
//   quesId: number,
//   quesType: questionTypes,
//   imgURL: string
// ) => {
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type && ques.type == quesType) {
//       return {
//         ...ques,
//         imgURL: imgURL,
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const changeQuestionHardMode = (
//   arr: iMultipleQuestion[] | iMatchQuestion[],
//   quesId: number,
//   quesType: questionTypes
// ): iQuestion[] => {
//   const newQuesArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == quesType) {
//       return {
//         ...ques,
//         isHardModeOn: !ques.isHardModeOn,
//       };
//     } else {
//       return ques;
//     }
//   });
//   return newQuesArr;
// };

// const changeQuestionGradeAmount = (
//   arr: iQuestion[],
//   quesId: number,
//   quesType: questionTypes,
//   gradeAmount: number
// ) => {
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == quesType) {
//       return {
//         ...ques,
//         gradeAmount: gradeAmount,
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const changeQuestionRegularOptionsArr = (
//   arr: iQuestion[],
//   quesId: number,
//   quesType: questionTypes,
//   optionsArr: iRegularOption[]
// ) => {
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == quesType) {
//       return {
//         ...ques,
//         optionsArr: optionsArr,
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const changeQuestionMatchOptionsArr = (
//   arr: iQuestion[],
//   quesId: number,
//   quesType: questionTypes,
//   optionsArr: iMatchOption[]
// ) => {
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == quesType) {
//       return {
//         ...ques,
//         optionsArr: optionsArr,
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const changeSimpleQuestionCorrectOptionId = (
//   arr: iSimpleQuestion[],
//   quesId: number,
//   quesType: questionTypes,
//   correctOptionId: number | undefined
// ) => {
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == quesType) {
//       return {
//         ...ques,
//         correctOptionId: correctOptionId,
//         optionsArr: ques.optionsArr.map((op) => {
//           if (op.id == correctOptionId) {
//             return {
//               ...op,
//               isCorrect: true,
//             };
//           } else {
//             return {
//               ...op,
//               isCorrect: false,
//             };
//           }
//         }),
//       };
//     } else {
//       return ques;
//     }
//   });
// };

// const changeMultipleQuestionCorrectOptionId = (
//   arr: iMultipleQuestion[],
//   quesId: number,
//   quesType: questionTypes,
//   correctOptionId: number | undefined
// ) => {
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == quesType) {
//       return {
//         ...ques,
//         correctOptionId: correctOptionId,
//         optionsArr: ques.optionsArr.map((op) => {
//           if (op.id == correctOptionId) {
//             return {
//               ...op,
//               isCorrect: !op.isCorrect,
//             };
//           }
//         }),
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const addQuestionOptionsArr = (
//   arr: iSimpleQuestion[] | iMultipleQuestion[],
//   quesId: number,
//   quesType: questionTypes,
//   option: iRegularOption
// ) => {
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == quesType) {
//       return {
//         ...ques,
//         optionsArr: [...ques.optionsArr, option],
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const deleteSimpleQuestionOptionsArr = (
//   arr: iSimpleQuestion[],
//   quesId: number,
//   optionId: number
// ) => {
//   let isChosenOption: boolean = false;
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == "Simple") {
//       const newArr = ques.optionsArr.filter((op) => {
//         if (op.id == optionId && op.isCorrect) {
//           isChosenOption = true;
//         }
//         return op.id !== optionId;
//       });

//       return {
//         ...ques,
//         optionsArr: newArr,
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const deleteMultipleQuestionOptionsArr = (
//   arr: iMultipleQuestion[],
//   quesId: number,
//   optionId: number
// ) => {
//   let isChosenOption: boolean = false;
//   const newQuestArr = arr.map((ques) => {
//     if (ques.id == quesId && ques.type == "Multiple") {
//       const newArr = ques.optionsArr.filter((op) => {
//         if (op.id == optionId && op.isCorrect) {
//           isChosenOption = true;
//         }
//         return op.id !== optionId;
//       });

//       return {
//         ...ques,
//         correctOptionsId: isChosenOption
//           ? ques.correctOptionsId?.filter((opId) => opId !== optionId)
//           : ques.correctOptionsId,
//         optionsArr: newArr,
//       };
//     } else {
//       return ques;
//     }
//   });

//   return newQuestArr;
// };

// const getQuestion = (
//   arr: iQuestion[],
//   quesId: number,
//   quesType: questionTypes
// ):
//   | iSimpleQuestion
//   | iMultipleQuestion
//   | iMatchOption
//   | iWrittenQuestion
//   | undefined => {
//   const ques = arr.find(({ id }) => id == quesId);

//   return ques?.type == quesType ? ques : undefined;
// };

// export const questionSettingMethods = {
//   changeQuestionTextInput,
//   changeQuestionImgURL,
//   changeQuestionHardMode,
//   changeQuestionGradeAmount,
//   changeQuestionRegularOptionsArr,
//   changeQuestionMatchOptionsArr,
//   changeSimpleQuestionCorrectOptionId,
//   changeMultipleQuestionCorrectOptionId,
//   addQuestionOptionsArr,
//   deleteSimpleQuestionOptionsArr,
//   deleteMultipleQuestionOptionsArr,
//   getQuestion,
// };
