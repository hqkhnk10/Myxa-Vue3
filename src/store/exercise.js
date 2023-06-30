import {
  addExercise,
  getDetailExercise,
  getExercises,
  updateExercise,
} from "@/api/exercise";
import { defineStore } from "pinia";
import {
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
import { decodeHtml, htmlEncode } from "@/js/format/format";

export const useExerciseStore = defineStore("exerciseStore", {
  state: () => ({
    exercises: [],
    formType: MisaEnum.FormActions.Add,
    paginationValue: {},
    questionId: null,
    loading: false,
    exerciseStatus: [
      {
        value: 0,
        label: "Đang soạn",
      },
      {
        value: 1,
        label: "Đã soạn",
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
          { func: required, message: "Tên bài tập không được để trống" },
          {
            func: maxLength,
            args: [255],
            message: "Tên bài tập không được vượt quá 255 kí tự",
          },
        ],
      },
      subjectId: {
        required: true,
        valid: true,
        message: "",
        validator: [
          { func: required, message: "Tên môn học không được để trống" },
        ],
      },
      gradeId: {
        required: true,
        valid: true,
        message: "",
        validator: [
          { func: required, message: "Tên khối không được để trống" },
        ],
      },
      topicId: {
        valid: true,
        message: "",
      },
    },
    paginationParams: {},
    exerciseParams: {},
  }),
  getters: {
    /**
     * Lấy số câu hỏi trong bài tập
     * @param {*} state
     * @returns
     * Created By: NQTruong (20/06/2023)
     */
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
     * Update trạng thái của bài tập
     * @param {*} status
     * Created By: NQTruong (20/06/2023)
     */
    updateStatusExercise(status) {
      updateExercise({ ...this.detailExercise, exerciseStatus: status });
    },
    /**
     * Validate dữ liệu bài tập
     * @returns
     * Created By: NQTruong (20/06/2023)
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
    addOrUpdateExercise() {
      addExercise({
        ...this.detailExercise,
        exerciseStatus: MisaEnum.ExerciseStatus.Prepared,
      });
    },
    /**
     * Lấy dữ liệu bài tập
     * Created By: NQTruong (20/06/2023)
     */
    getExercises() {
      this.loading = true;
      getExercises({
        ...this.paginationParams,
        ...this.exerciseParams,
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
        this.detailExercise.questions.forEach((q) => {
          q.questionContent = decodeHtml(q.questionContent);
          q.questionNote = decodeHtml(q.questionNote);
          q?.answers?.forEach((a) => {
            a.answerContent = decodeHtml(a.answerContent);
          });
        });
      });
    },
    /**
     * Thêm câu hỏi
     * Created By: NQTruong (20/06/2023)
     */
    addQuestion(type, question, answers) {
      const validAnswer = answers?.filter((a) => a.answerContent);
      validAnswer.forEach((a) => {
        a.answerContent = htmlEncode(a.answerContent);
      });
      const postData = {
        exercise: { ...this.detailExercise },
        questionType: question.questionType,
        questionContent: htmlEncode(question.questionContent),
        questionNote: htmlEncode(question.questionNote),
        answers: validAnswer,
      };
      switch (type) {
        case MisaEnum.FormActions.Add:
        case MisaEnum.FormActions.Clone:
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
        case MisaEnum.QuestionType.Choosing:
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
        case MisaEnum.QuestionType.TrueFalse:
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
     * Đổi trạng thái (dành cho đúng/sai)
     * @param {*} index
     * Created By: NQTruong (20/06/2023)
     */
    changeStatus(index) {
      this.answers.forEach((a) => {
        a.answerStatus = false;
      });
      this.answers[index].answerStatus = true;
    },
    /**
     * Thay đổi dữ liệu đúng/sai của đáp án
     * @param {*} index
     * Created By: NQTruong (20/06/2023)
     */
    checkStatus(index) {
      this.answers[index].answerStatus = !this.answers[index].answerStatus;
    },
    /**
     * Xóa câu trả lời
     * @param {*} index
     * Created By: NQTruong (20/06/2023)
     */
    deleteAnswer(index) {
      if (this.answers.length == 1) {
        dispatchNotification({
          content: "Câu hỏi phải có ít nhất 1 đáp án",
          type: "warning",
        });
        return;
      }

      this.answers.splice(index, 1);
    },
    /**
     * Thêm câu trả lời
     * Created By: NQTruong (20/06/2023)
     */
    addAnswer() {
      this.answers.push({});
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
