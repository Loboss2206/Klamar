export interface IUserConfig {
  simon: {
    isColorful: boolean;
  },
  tips: {
    displayHintOnStart: boolean;
    displayHintOnWrongAnswer: boolean;
    displayHintOnCorrectAnswer: boolean;
    displayHintOnClick: boolean;
  };
  simonHints: {
    displayTheFullSequenceAfter: number;
  };
  memoryHints: {
    displayTheFullSequenceAfter: number;
  };
  quiz: {
  };
  zoomLevel: number;
}
