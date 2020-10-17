const { Stack, Duration } = require('@aws-cdk/core');
const { Function, Code, Runtime } = require('@aws-cdk/aws-lambda');
const path = require('path');
const constants = require('./consts');

class EighteenSeventyFourStack extends Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const crawlerHandler = new Function(this, 'crawler-handler', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, '../lambda/crawler')),
      handler: 'index.handler',
      timeout: Duration.seconds(10),
      functionName: 'eighteenseventyfour-crawler',
    });
    crawlerHandler.addEnvironment('RESULTS_FIXTURES_URL', constants.EIGHTEENSEVENTYFOUR_HOMEPAGE);
  }
}

module.exports = { EighteenSeventyFourStack }
