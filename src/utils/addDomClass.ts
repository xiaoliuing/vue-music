interface ClassNameINT{
  (el: any, className: string):boolean | undefined
}

export const hasClassName: ClassNameINT = function (el, className) {
  let reg = new RegExp(`{^|\\s}${className}{\\s|$}`);
  return reg.test(el.className);
}

export const addClass: ClassNameINT = function (el, className) {
  if(hasClassName(el, className)) {
    return undefined;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}