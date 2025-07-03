import { ChatOllama } from "@langchain/ollama";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage, trimMessages } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";


import { javascriptTool } from "./javascriptTool.ts";

import readline from 'node:readline';


const main = async () => {
    const agentTools = [javascriptTool]
    const agentModel = new ChatOllama({ model: "qwen3:8b", temperature: 0 });

    const agentCheckpointer = new MemorySaver();
    const agent = createReactAgent({
	llm: agentModel,
	tools: agentTools,
	checkpointSaver: agentCheckpointer,
    });

    const messages = [];
    const trimmer = trimMessages({
	maxTokens: 10,
	strategy: "last",
	tokenCounter: (msgs) => msgs.length,
	includeSystem: true,
	allowPartial: false,
	startOn: "human",
    });


    const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "> ",
    });

    console.log("Hi there. I am an LLM Chatbot, augmented with a simple tool for frequently asked questions.");
    console.log("Please pose a question and I will do my best to help. Press Ctrl+C or Ctrl+D to exit.");
    for await (const line of rl) {
	messages.push(new HumanMessage(line));

	const agentState = await agent.invoke({messages}, {configurable: {thread_id:"42"}})
	console.log(agentState.messages.at(-1).thinkingContent);
	console.log(agentState.messages.at(-1).content);
    }
}

await main();
