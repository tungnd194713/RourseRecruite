<template>
  <div>
    <div class="exam-container">
      <!-- Exam Header -->
      <div class="exam-header">
        <div class="d-flex justify-content-between">
          <h2 class="exam-title">{{ test.name }}</h2>
        </div>
        <div class="exam-info">
          <div>
            <p>Đề thi gồm {{ test.questions ? test.questions.length : 0 }} câu.</p>
          </div>
          <div>
            <p>Thời gian {{ test.time }} phút.</p>
          </div>
        </div>
      </div>

      <!-- Questions -->
      <div class="questions">
        <div v-for="(question, index) in test.questions" :key="question._id" class="question" :id="`q-${question.id || question._id}`">
          <!-- Question Header -->
          <div class="question-header">
            <span class="question-label">Câu {{ index + 1 }}:</span>
            <!-- <el-tag :type="getLabelColor(question)">{{ getLabelTag(question) }}</el-tag> -->
          </div>

          <!-- Question Content -->
          <div class="question-content">{{ question.question }}</div>

          <!-- Choices -->
          <div class="choices">
            <el-button v-for="(choice, idx) in question.choices" :key="choice.id" :type="choice.isTrue ? 'success' : 'default'" class="choice-button">
              {{ String.fromCharCode(65 + idx) }}:
              <span class="choice-content">{{ choice.content }}</span>
            </el-button>
          </div>

          <!-- Answer -->
          <el-card class="answer-card">
            <h4>Lời giải</h4>
            <div class="answer-content">{{ question.answer }}</div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      test: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      totalTime() {
        return this.test.time * 60 * 1000;
      },
    },
  };
</script>

<style scoped>
  .exam-container {
    padding: 20px;
  }

  .exam-header {
    margin-bottom: 20px;
  }

  .exam-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .exam-info {
    display: flex;
    justify-content: space-between;
  }

  .questions {
    display: grid;
    gap: 20px;
  }

  .question {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    scroll-margin-top: 100px;
  }

  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .question-label {
    font-size: 16px;
  }

  .question-content {
    margin-bottom: 15px;
  }

  .choices {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-start;
  }

  .choice-button {
    flex: 0 0 calc(33.33% - 10px);
    margin-bottom: 10px;
    margin-right: 0;
    margin-left: 10px;
  }

  .choice-content {
    flex: 0 0 100%;
  }

  .answer-card {
    margin-top: 15px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
  }

  .answer-card h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .answer-content {
    font-size: 16px;
  }

  .submit-button {
    margin-top: 20px;
    width: 100%;
  }

  .sidebar-content {
    padding: 20px;
  }

  .sidebar-content h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .time-left {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .shortcut-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .shortcut-buttons el-button {
    flex: 0 0 calc(33.33% - 10px);
  }

  .toggle-button {
    position: fixed;
    top: 90px;
    right: 20px;
  }
</style>
