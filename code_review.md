### Code smells :-
```
1. Each library should have respective test file util.js -> headLibTest.js.
2. headAndTail.js => head and tail function can have fs as second parameter instead of first parameter.
3. head.js and tail.js => its preferred to have main function .
4. headAndTail.js => line no 54 : optionParaCandidate variable name can be better — unnecessary abbreviation.
5. headAndTail.js => line no 11 : usage of global object.
6. headAndTail.js => headLibTest : test file and source file have different names.
7. headAndTail.js => line no 17 : unnecessary logic subtraction by 0.
8. headAndTail.js => line no 16 : invalidCount function name can be better .(use of is or has is preferable as it is predicate).
9. headAndTail.js => head function has getContent and getContentWithHeadings as nested function. They can be extracted as separate functions. 
10. headAndTail.js => line no 43 : unnecessary usage of map and join for single element .
11. headAndTail.js => validateOption is not sounding like a predicate.
12. headAndTail.js => head and tail  functions have duplicate code.
13. headAndTail.js => tail function can be modified . (Reversing can be done by ‘take’ itself)
14. headLibTest.js => dummyFiles can be inside fs object.
15. headLibTest.js => split can use const instead of let.
16. headLibTest.js => line no 58 input arguments can be explicit.
17. headLibTest.js => arguments passed to assert can be taken in as a variable as multiple function calls make it look complicated.
18. headLibTest.js => it blocks are not descriptive enough.
19. headLibTest.js => it will make it much easy to read if describe blocks are separated by empty lines.
20. headLibTest.js => it will be preferable if assert.equal is used for strings assertions.
21. headLibTest.js => unnecessary test on line number 252.
22. headLibTest.js => tail tests expected output can be simpler.
```

