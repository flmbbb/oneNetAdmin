<template>
  <div style="width: 100%; height: 100%">
    <!-- 菜单栏 -->
    <el-row>
      <el-button @click="onNewWork">123131</el-button>
    </el-row>
    <el-container>
      <!-- 工具控件栏 -->
      <el-aside width="200px">Aside</el-aside>
      <el-main style="width: 100%; background-color: gray">
        <!-- 纸张大小 -->
        <div ref="workContainer">
          <ReportContainer ref="MainContainer"></ReportContainer>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import { TReportContainerSet } from "./ReportClass";
import ReportContainer from "./ReportContainer.vue";
//配合着用
@Options({
  components: {
    ReportContainer,
  },
  computed: {},
})
export default class ReportDesignMain extends Vue {
  declare $refs: {
    MainContainer: ReportContainer;
  };

  public created() {}
  private AddContainer() {
    let temp: ReportContainer = new ReportContainer();
  }
  private onNewWork() {
    this.$refs.MainContainer.containerSet.style.width = "700px";
    this.$refs.MainContainer.containerSet.style.height = "700px";
    let lTemp = new TReportContainerSet();
    lTemp.style.width = "500px";
    lTemp.style.height = "500px";
    this.$refs.MainContainer.containerSet.children.push(lTemp);
  }
}
</script>
