import { addExercise, getDetailExercise, getExercises } from "@/api/exercise";
import { defineStore } from "pinia";
import {
  defaultImg,
  toan,
  tienganh,
  diali,
  gdcd,
  lichsu,
  nguvan,
} from "@/js/img/getSubjectImg";
import {
  library,
  line,
  select,
  yesorno,
  fill,
  pairing,
  group,
  essay,
} from "@/js/img/getQuestionImg";
import MisaEnum from "@/js/base/enum";
import { deleteQuestion, postQuestion, updateQuestion } from "@/api/question";
import { dispatchNotification } from "@/components/Notification";
import { globals } from "@/main";
import { useRouter } from "vue-router";
import { router } from "@/routers/router";
import { maxLength, required } from "@/js/validate/validate";

export const useExerciseStore = defineStore("exerciseStore", {
  state: () => ({
    exercises: [],
    formType: MisaEnum.FormActions.Add,
    paginationValue: {},
    questionId: null,
    loading: false,
    exerciseStatus: [
      {
        value: 1,
        label: "Đã soạn",
      },
      {
        value: 2,
        label: "Đang soạn",
      },
      {
        value: 3,
        label: "Đã chia sẻ",
      },
      {
        value: 4,
        label: "Chưa chia sẻ",
      },
      {
        value: 5,
        label: "Lấy từ thư viện",
      },
    ],
    detailExercise: {
      exerciseId: null,
      exerciseName: "",
      subjectId: 1,
      gradeId: 1,
      subjectImage: "toan.png",
      topicId: null,
      questions: [],
    },
    questions: [],
    questionTypeOptions: [
      { value: 1, label: "Chọn đáp án", img: select },
      { value: 2, label: "Đúng sai", img: yesorno },
      { value: 3, label: "Điền vào chỗ trống", img: fill },
      { value: 4, label: "Ghép nối", img: pairing },
      { value: 5, label: "Câu hỏi nhóm", img: group },
      { value: 6, label: "Tự luận", img: essay },
    ],
    answers: [],
    validate: {
      exerciseName: {
        required: true,
        valid: true,
        message: "",
        validator: [
          { func: required, message: "Tên danh hiệu không được để trống" },
          {
            func: maxLength,
            args: [255],
            message: "Tên danh hiệu không được vượt quá 255 kí tự",
          },
        ],
      },
      subjectId: {
        required: true,
        valid: true,
        message: "",
        validator: [
          { func: required, message: "Tên danh hiệu không được để trống" },
        ],
      },
      gradeId: {
        required: true,
        valid: true,
        message: "",
        validator: [
          { func: required, message: "Tên danh hiệu không được để trống" },
        ],
      },
      topicId: {
        valid: true,
        message: "",
      },
    },
  }),
  getters: {
    getTotalQuestion(state) {
      return state.detailExercise.questions.length;
    },
    /**
     * Lấy id của exercise
     * @param {*} state
     * @returns exerciseId
     * Created By: NQTruong (20/06/2023)
     */
    getExerciseId(state) {
      return state.detailExercise.exerciseId;
    },
    /**
     * Lấy id của question
     * @param {*} state
     * @returns
     * Created By: NQTruong (20/06/2023)
     */
    getQuestionId(state) {
      return state.questionId;
    },
    /**
     * Lấy chi tiết dữ liệu của câu hỏi
     * @param {*} state
     * @returns
     * Created By: NQTruong (20/06/2023)
     */
    getDetailQuestion(state) {
      return (index) => state.detailExercise.questions[index];
    },
  },
  actions: {
    /**
     * Validate dữ liệu bài tập
     * @returns
     */
    validateForm(form = this.detailExercise) {
      let isValid = true;
      Object.keys(this.validate).forEach((item) => {
        const prop = this.validate[item];
        prop.valid =
          prop?.validator?.length > 0
            ? prop.validator.every((e) => {
                const { args = [], func, message } = e;
                const valid = func(form[item], ...args);
                prop.message = valid ? "" : message;
                return valid;
              })
            : prop.valid;

        isValid = isValid && prop.valid;
      });
      return isValid;
    },
    /**
     * Thêm hoặc sửa bài tập
     * Created By: NQTruong (20/06/2023)
     */
    addExercise() {
      addExercise({ ...this.detailExercise });
    },
    /**
     * Lấy dữ liệu bài tập
     * @param {*} paginationParams
     * @param {*} exerciseParams
     * Created By: NQTruong (20/06/2023)
     */
    getExercises(paginationParams, exerciseParams) {
      this.loading = true;
      getExercises({
        ...paginationParams,
        ...exerciseParams,
      })
        .then((res) => {
          this.exercises = res.data;
          this.paginationValue = res.pagination;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * Lấy dữ liệu bài tập theo id
     * @param {*} paginationParams
     * @param {*} exerciseParams
     * Created By: NQTruong (20/06/2023)
     */
    getExerciseById(id) {
      getDetailExercise(id).then((res) => {
        this.detailExercise = { ...res.data[0] };
      });
    },
    /**
     * Thêm câu hỏi
     * Created By: NQTruong (20/06/2023)
     */
    addQuestion(type, question, answers) {
      const validAnswer = answers?.filter((a) => a.answerContent);
      const postData = {
        exercise: { ...this.detailExercise },
        ...question,
        answers: validAnswer,
      };
      switch (type) {
        case MisaEnum.FormActions.Add:
          return postQuestion(postData)
            .then((res) => {
              dispatchNotification({
                content: globals.t("reuse.addSuccess"),
                type: "success",
              });
              this.getExerciseById(res.data);
              if (this.getExerciseId !== res.data) {
                router.push(MisaEnum.Router.PreparePage + "/" + res.data);
              }
              return true;
            })
            .catch(() => {
              return false;
            });
        case MisaEnum.FormActions.Edit:
          return updateQuestion(postData, question.questionId)
            .then((res) => {
              dispatchNotification({
                content: globals.t("reuse.editSuccess"),
                type: "success",
              });
              this.getExerciseById(this.getExerciseId);
              return true;
            })
            .catch(() => {
              return false;
            });
        default:
          return false;
      }
    },
    /**
     * Xóa câu hỏi
     * Created By: NQTruong (20/06/2023)
     */
    deleteQuestion(id) {
      deleteQuestion(id).then(() => {
        dispatchNotification({
          content: globals.t("reuse.deleteSuccess"),
          type: "success",
        });
        this.getExerciseById(this.getExerciseId);
      });
    },
    /**
     * Update state của bài tập
     * Created By: NQTruong (20/06/2023)
     */
    updateExercise(exercise) {
      Object.assign(this.detailExercise, exercise);
    },
    /**
     * Tạo câu trả lời
     * @param {*} questionType
     * Created By: NQTruong (20/06/2023)
     */
    createDefatulAnswer(questionType) {
      switch (questionType) {
        case 1:
          this.answers = [
            {
              answerContent: "",
              status: false,
            },
            {
              answerContent: "",
              status: false,
            },
            {
              answerContent: "",
              status: false,
            },
            {
              answerContent: "",
              status: false,
            },
          ];
          break;
        case 2:
          this.answers = [
            {
              answerContent: "Đúng",
              status: false,
            },
            {
              answerContent: "Sai",
              status: false,
            },
          ];
          break;
        default:
          break;
      }
    },
    /**
     * Reset dữ liệu
     * Created By: NQTruong (20/06/2023)
     */
    resetValue() {
      this.detailExercise = {
        exerciseId: null,
        exerciseName: "",
        subjectId: 1,
        gradeId: 1,
        subjectImage: "",
        topicId: null,
        questions: [],
      };
    },
  },
});
