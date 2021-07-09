<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="6">
          <el-card class="box-card data_list node_num1">
            <div class>
              <span class="data_num head">节点数：{{ page.total }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card data_list node_num2">
            <div class>
              <span class="data_num head">已兑换BZZ数量：暂无数据支持</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card data_list node_num3">
            <div class>
              <span class="data_num head">节点故障：暂无数据支持</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
    <!-- <div>| 全球节点分布</div>
    <tendency :sevenDate="sevenDate" :sevenDay="sevenDay"></tendency>-->
    <div class="table_container">
      <div>| 节点列表</div>
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column
          prop="ethereum"
          label="以太坊地址"
          width="220"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          property="ip"
          label="IP地址"
          width="220"
        ></el-table-column>
        <el-table-column property="status" label="状态">
          <template slot-scope="scope">
            {{ statusList[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column
          property="uncash"
          label="未提取支票数量"
          width="220"
        ></el-table-column>
        <el-table-column
          property="cash_adress"
          label="支票地址"
        ></el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <pagination
          v-if="pageshow && page.total > 0"
          :total="page.total"
          :page.sync="page.page"
          :limit.sync="page.pageSize"
          @pagination="handlePageChange"
          :size="10"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import tendency from "../components/tendency";
import Pagination from "@/components/Pagination";
import { getNodeList } from "@/api/getData";
export default {
  data() {
    return {
      pageshow: true,
      statusList: { 0: "未启动", 1: "已启动" },
      tableData: [],
      page: {
        pageSize: 10,
        total: 0,
        page: 1
      }
    };
  },
  components: {
    headTop,
    tendency,
    Pagination
  },
  mounted() {
    this.getNode();
  },
  computed: {},
  computed: {},
  methods: {
    async getNode() {
      try {
        const res = await getNodeList({
          page: this.page.page,
          pageSize: this.page.pageSize
        });
        if (res.code == 200) {
          const { list, ...page } = res.result;
          this.tableData = list;
          this.page = page;
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    handlePageChange(val) {
      this.getNode();
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 16px;
    }
    .head {
      border-radius: 6px;
      font-size: 16px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .node_num1 {
    background: rgb(35, 211, 214);
  }
  .node_num2 {
    background: burlywood;
  }
  .node_num3 {
    background: rgb(74, 201, 89);
  }
}
.wan {
  .sc(16px, #333);
}
</style>
