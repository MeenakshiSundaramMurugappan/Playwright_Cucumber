module.exports ={
    default: [
        "./features/*.feature",
        "--require ./step-definition/*.step.js",
        "--require ./support/hooks.js",
        "--parallel 1"
    ].join(" ")
};