<template>
  <div class="pagination-wrapper">
    <el-row
      type="flex"
      class="row-bg"
      justify="end"
    >
      <el-col
        :span="24"
        v-if='size'
      >
        <el-pagination
          style="float: right; margin-right: 10px;"
          :background="background"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next, slot, jumper"
          :page-size="size"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
      <el-col
        :span="24"
        v-else
      >
        <el-pagination
          style="float: right; margin-right: 10px;"
          :background="background"
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :layout="layout"
          :page-sizes="pageSizes"
          :total="total"
          v-bind="$attrs"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, slot, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  mounted() {
  },
  methods: {
    handleSizeChange(val) {
      // 每次更换页数大小时，跳转到第一页
      this.currentPage = 1
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 0)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 0)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 15px 15px 0px 10px;
  font-size: 12px;
  width: 100%;
}
.pagination-container.hidden {
  display: none;
}
</style>
