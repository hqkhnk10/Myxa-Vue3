const MisaEnum = {
  Router:{
    PreparePage: "/prepare"
  },
  Lang: {
    Vietnamese: "vi",
    English: "en",
  },
  FormActions: {
    Add: "add",
    Edit: "edit",
    Detail: "detail",
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
    Preparing: 1,
    Prepared: 2,
    Shared: 3,
    NotShared: 4,
    FromLibrary: 5,
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
