// * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/two-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @desc: 两数之和
 * @param {Array} nums 
 * @param {Array} target 
 * @linK https://leetcode-cn.com/problems/two-sum/ 两数之和
 */
// 方法 1 暴力破解： 时间复杂度 O(n^2), 空间复杂度 O(n)
function twoSum(nums, target) {
  var res = []
  for (var i = 0, len = nums.length; i < len; i++) {
      for (var j=i+1; j < nums.length; j++) {
          if (nums[i] + nums[j] === target) {
              res = [i, j]
              return res
          }
      }
  }
  return null
}
// 方法2： 字典 map 法： 将每个数组元素作为 key, 数组索引作为 value, 
// 执行一次遍历，看 targetMap[target-current] 是否存在
// 这里， 多个相同的 value, 索引会被覆盖。但是题目说，一个输入，只对应一个解，所以不存在这种情况.
// 时间复杂度： O(n), 空间复杂度 O(1)
var twoSum2 = function(nums, target) {
  var numMap = {}
  for (var i = 0; i < nums.length; i++) {
      numMap[nums[i]] = i
  }
  for (var j = 0; j < nums.length; j++) {
    var leftNum = target - nums[j];
    // 防止同一个元素使用两次
    if (numMap[leftNum] && j !== numMap[leftNum]) {
        return [j, numMap[leftNum]]
    }
  }
  return []
};

// 方法 2 的改进版： 使用一轮循环， 难理解一些，就是遍历的过程中 构造 hashMap
// 正常版 [3, 3] 6 -> [0, 1]
// 此方法： [3, 3] 6 => [1, 0]
// 推荐： 👍
var twoSum2_2 = function(nums, target) {
  var numMap = {}
  for (var i = 0, len= nums.length; i < len; i++) {
    var leftNum = target - nums[i]
    // 或者使用 leftNum in  numMap
    if (numMap[leftNum] !== undefined) {
      return [numMap[leftNum], i]
    }
    numMap[nums[i]] = i
  }
  return []
};

// twoSum2([2,7,11,15], 9) => [0, 1]


// 方法 3： js 特定, 使用 api  indexOf 垃圾，还要截取一下数据, 因为 存在 [3,3] 6 这种情况
var twoSum3 = function(nums, target) {
  for (var i = 0; i < nums.length; i++) {
    var subNums = nums.slice(i+1)
    var index = subNums.indexOf(target - nums[i])
    if (index >= 0) {
      return [i, index + i + 1]
    }
  }
  return []
};

/**
 * 两数之和的变种，不限制一个输入对应一个输出，数组元素允许重复。
 * @param {Array} nums 
 * @param {[][]} target 
 * @example 输入： [3, 1, 3, 5], 6 输出： [[0, 2], [1,3]]
 */
var twoSum4 = function(nums, target) {
  var numMap = {}
  var result = []
  var finalRes = []
  for (var i = 0; i < nums.length; i++) {
      if (!numMap[nums[i]]) {
        numMap[nums[i]] = [i]
      } else {
        numMap[nums[i]].push(i)
      }
  }
  console.log('numMap:', numMap)
  for (var j = 0; j < nums.length; j++) {
    var leftNum = target - nums[j];
    if (numMap[leftNum]) {
      result.push([j, numMap[leftNum]])
    }
  }

  for (var k = 0; k < result.length; k++) {
    var left = result[k][0]
    var subArr = result[k][1]
    for (var l = 0; l < subArr.length; l ++) {
      if (left < subArr[l]) {
        finalRes.push([left, subArr[l]])
      }
    }
  }
  return finalRes
};

// var res = twoSum4([3, 1, 3, 5], 6)
// console.log('res:', res)

var res = twoSum2([3,3], 6)
console.log('res:', res) // [1, 3] => [3,1]