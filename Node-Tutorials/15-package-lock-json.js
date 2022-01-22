/* 
    Why do we need package-lock.json?
--> We see that the dependencies in package.json have versions and some of the dependencies have their own dependencies.
    Those dependencies have version as well.

    If some person uses our code then we would want him to have same project setup. Because if the version of some dependency 
    changes then the code might not work.

    The package-lock.json has the versions of the specific packages used.

    Version terminology
    Eg- "lodash": "^4.17.20"

    The version consists of 3 parts
    1st number is a major change. If it changes that means there are breaking changes
    2nd number is a minor change. If it changes then there are no breaking changes
    3rd number is a patch for bug fix

    For more infor- nodesource.com The basics of package.json in Node.js and npm 

*/