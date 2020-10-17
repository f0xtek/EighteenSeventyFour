const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const EighteenSeventyFour = require('../lib/eighteen_seventy_four-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new EighteenSeventyFour.EighteenSeventyFourStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
