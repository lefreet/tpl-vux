module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "项目名称"
    },
    "description": {
      "type": "string",
      "required": true,
      "message": "项目描述",
      "default": "A vue project"
    },
    "author": {
      "type": "string",
      "message": "作者"
    },
    "demo": {
      "type": "confirm",
      "message": "是否需要demo？" 
    }
  },
  "filters": {
    "src/demo/*": "demo",
    "static/demo/*": "demo"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev"
};
