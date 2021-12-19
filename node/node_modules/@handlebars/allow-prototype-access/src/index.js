export function allowInsecurePrototypeAccess(HandlebarsInstance) {
  return wrapCompileFunction(HandlebarsInstance.create());
}

function wrapCompileFunction(handlebarsInstance) {
  const originalCompile = handlebarsInstance.compile;
  handlebarsInstance.compile = function compile(templateString, compileOptions) {
    const template = originalCompile.call(this, templateString, compileOptions);
    return function insecureTemplate(context, runtimeOptions) {
      return template(context, extendRuntimeOptions(runtimeOptions));
    };
  };

  return handlebarsInstance;
}

function extendRuntimeOptions(runtimeOptions) {
  return {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
    ...runtimeOptions
  };
}
