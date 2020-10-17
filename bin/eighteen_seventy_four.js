#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { EighteenSeventyFourStack } = require('../lib/eighteen_seventy_four-stack');

const app = new cdk.App();
new EighteenSeventyFourStack(app, 'EighteenSeventyFourStack');
