import { z } from "zod";
import { tool } from "@langchain/core/tools";

export const javascriptTool = tool(
  async (args: any): Promise<[string, any]> => {
    const code = args.code;
    console.log({src:"javascriptTool", code})
    const result = eval(code)
    console.log({src:"javascriptTool", result})

    if (code !== undefined) {
      console.log({msg: "javascriptTool providing this result", result})
      return {content: result, artifact: undefined}
    } else {
      console.log({msg: "javascriptTool providing empty result"})
      return {content: "", artifact: undefined}
    }
  },
  {
    name: "javascriptTool",
    description: "Tool that evaluates arbitrary javascript",
    schema: z.object({
      code: z.string().describe("Some javascript code."),
    }),
    returnType: "content_and_artifact"
  }
);
