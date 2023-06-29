const MisaEnum = {
  Router:{
    PreparePage: "/prepare",
    StudyPage: "/study"
  },
  Lang: {
    Vietnamese: "vi",
    English: "en",
  },
  FormActions: {
    Add: "add",
    Edit: "edit",
    Detail: "detail",
    Clone: "clone"
  },
  Keys: {
    EmulationTitle: "emulationtitle",
  },
  EmulationTitle: {
    ApplyObject: {
      Family: 4,
      PersonAndOrg: 3,
      Person: 2,
      Organization: 1,
    },
    CommendationLevel: {
      CapXa: 4,
      CapHuyen: 3,
      CapTinh: 2,
      CapNhaNuoc: 1,
    },
    MovementType: {
      Sometimes: 0,
      Period: 1,
      SometimesAndPeriod: 2,
    },
    Active: 0,
    Inactive: 1,
  },
  ExerciseStatus: {
    Preparing: 0,
    Prepared: 1,
    Shared: 2,
    NotShared: 3,
    FromLibrary: 4,
  },
  QuestionType:{
    Choosing: 1,
    TrueFalse: 2,
    Fill: 3,
    Connect: 4,
    Group: 5,
    Essay: 6,
  }
};
export default MisaEnum;
