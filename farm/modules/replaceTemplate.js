/*
@Date		:2023/12/01 17:40:09
@Author		:zono
@Description:用真实数据替换模板
*/
module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); //用正则表达式替换所有的占位符
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
