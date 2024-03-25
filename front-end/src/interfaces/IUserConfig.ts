export interface IUserConfig {
  tips: {
    displayHintOnStart: boolean;
    displayHintOnWrongAnswer: boolean;
    displayHintOnCorrectAnswer: boolean;
    displayHintOnClick: boolean;
  };
  simonHints: {
    displayTheFirstItemAfter: number;
    displayTheFullSequenceAfter: number;
    numberOfRetryAllowed: number;
  };
  memoryHints: {
    displayTheFirstItemAfter: number;
    displayTheFullSequenceAfter: number;
    numberOfRetryAllowed: number;
  };
  quiz: {
    numberOfRetryAllowed: number;
  };
  zoomLevel: number;
}
