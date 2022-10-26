// eslint-disable-next-line no-undef
module.exports = {
  // 继承规则
  extends: ["@commitlint/config-conventional"],
  // 定义规则类型
  rules: {
    "type-enum": [
      // 错误级别
      2,
      // 什么情况下进行验证
      "always",
      ["upd", "feat", "fix", "refactor", "docs", "chore", "style", "revert"],
    ],
    "type-case": [0],
    "type-empty": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"], // 大小写不做校验
    "header-max-length": [0, "always", 72],
  },
};
