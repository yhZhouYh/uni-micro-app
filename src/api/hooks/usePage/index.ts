/*
 * @Author: zhangxiangxiang
 * @Description:
 * @Date: 2023-08-19 15:57:34
 * @LastEditors: zxx
 * @LastEditTime: 2023-11-01 21:27:29
 * @FilePath: /krafthein-mpm/src/hooks/usePage/index.ts
 */
import type { IPageData } from './types'
import type { PageType } from '~/api/types'

function isNumber(data: unknown): data is number {
  return typeof data === 'number' && !Number.isNaN(data)
}

/**
 *
 * @param fn
 * @param options start_page 从第几页开始
 * @description 分页hook
 * @returns Promise
 */
export function usePage(fn: (page: PageType['page'], size: PageType['size']) => Promise<IPageData>, options?: PageType) {
  const page = ref(options?.page ?? 1)
  const size = ref(options?.size ?? 10)
  const loading = ref(false)
  const list = ref<unknown>(null)
  const total = ref<unknown>(null)
  const isError = ref(false)
  function resetPage() {
    total.value = null
    list.value = null
    page.value = options?.page ?? 1
  }

  async function getMorePage(pageNum = null) {
    pageNum !== null && typeof pageNum !== 'object' && (page.value = pageNum)
    // 接口报错时不再继续
    if (isError.value)
      return
    // list大于等于总页数时
    if (page.value !== 0 && Array.isArray(list.value) && isNumber(total.value) && list.value.length >= total.value) {
      if (isNumber(total.value) && total.value === 0)
        return
    }
    // loading时
    if (loading.value)
      return
    loading.value = true

    const res = await fn(page.value, size.value)
    isError.value = false
    loading.value = false
    if (!res) {
      isError.value = true
      return
    }
    // 第一页重置
    page.value === 0 && resetPage()
    const data = res?.list || []

    // list.value = page.value === (options?.page ?? 1) ? data : (list.value as []).concat(data)
    list.value = page.value === (options?.page ?? 1) ? data : (list.value as []).concat(data)
    total.value = res?.total ?? 0
    // console.log('data2', list)
    page.value++
  }
  return {
    page,
    size,
    loading,
    list,
    total,
    getMorePage,
    resetPage,
  }
}
