== Usage: ==

```
# install OLLAMA by following the directions here:
# https://ollama.com/download

...

# pull the qwen3:0.6b model
ollama pull qwen3:0.6b

# install npm dependencies
npm i

# run the application
npm start
```

Written using node 24.0.2 and the library versions specified in
package.json

Qwen3 was chosen to make local development easy to handle even on
older hardware. Changing this to a more robust model will likely
provide better responses, especially when the prompt includes
questions that are not in the FAQs.

Unit tests are left out, in order to keep time allocation down. A full
solution would include unit tests to ensure that the questions are
handled properly.

This is a simple agent that includes a Javascript evaluator tool.  The
evaluator logs the Javascript provided to it, arguments passed, etc.,
and returns output serialized into an appropriate json blob.

Some fun prompts:

```
Write and then evaluate a javascript function that returns the square of the sum of two numbers. Use 4 and 6 as the two inputs. Do not think about what it should return - trust the function you write. I am testing whether you use the javascript evalution tool properly.
```

```
Write and then evaluate a javascript function that returns the nth distinct number in the Fibonnaci sequence. Call this function 10 times to get the list of the first 10 distinct numbers in the Fibonacci sequence. Do not think about what the result will be; trust the function you write. I am testing whether you use the javascript evalution tool properly. Handle the edge case that the first distinct Fibonacci sequence entry is '1'
```

```
Write a javascript generator function that yields the distinct numbers in the Fibonacci sequence. Use this generator function to build an array with the first 10 distinct numbers in the Fibonacci sequence and return that array to yourself as JSON. Do not think through what the result will be or look at previous chat history. I am testing whether you use the javascript evaluation tool properly. Again, DO NOT THINK ABOUT THE RESULT.
```

For fairly obvious security reasons, do not run the javascriptTool
somewhere that bad actors might get access. That would be the very
definition of an RCE vulnerability. Also, don't prompt the AI to
produce code that could be malicious or damaging to your machine.
