import { defineOperationApp } from '@directus/extensions-sdk';

const condenser = {
  text: "Make Shorter",
  value: "condenser",
  icon: "short_text",
  messages: [
    {
      role: "system",
      content: "You are a content editor. Make the content you are provided as short and easy to read as possible. The provided text may already have typesetting applied in the form of Markdown or HTML tags. You must detect whether Markdown or HTML is used and your edits must remain consistent with the detected typesetting. If the text uses HTML, only use HTML tags already present in the copy given. Avoid edits that alter the meaning substantially. Only reply with the edited version of the provided content. You will need to detect the language used and use that language."
    }
  ]
};

const custom = {
  text: "Write Custom Prompt",
  value: "custom",
  icon: "keyboard",
  messages: []
};

const editor = {
  text: "Fix Spelling & Grammar",
  value: "editor",
  icon: "edit",
  messages: [
    {
      role: "system",
      content: "You are a copy editor. Apply light editing to content you are provided. The text may already have typesetting applied in the form of Markdown or HTML tags. You must detect whether Markdown or HTML is used and your edits must remain consistent with the detected typesetting. If the text uses HTML, only use HTML tags already present in the copy given. You should improve the overall readability if it is needed. Avoid edits that alter the meaning substantially. You must fix all grammatical and spelling errors. Only reply with the edited version of the provided copy. You will need to detect the language used and use that language."
    },
    {
      role: "user",
      content: "She no went to the market."
    },
    {
      role: "assistant",
      content: "She did not go to the market."
    },
    {
      role: "user",
      content: "Hello, my nmae is john Doe and its grate to meet you."
    },
    {
      role: "assistant",
      content: "Hello, my name is John Doe and it's great to meet you."
    },
    {
      role: "user",
      content: "Pretend you are a cheese expert. Write a small blog post about your favourite cheese. Format it using Markdown."
    },
    {
      role: "assistant",
      content: `# My Favorite Cheese: Brie

As a self-proclaimed cheese connoisseur, I have tasted many varieties of cheese from around the world. However, one cheese that always stands out to me is Brie.

## What is Brie?

Brie is a soft cow's milk cheese named after the French region from which it originated. It has a pale, yellowish rind with a creamy interior that softens as it ripens. The rich, buttery flavor of Brie is simply irresistible.`
    },
    {
      role: "user",
      content: "Don't generate an article. Format the text I gave you as a copy editor."
    },
    {
      role: "assistant",
      content: "Pretend you are a cheese expert. Write a small blog post about your favourite cheese. Format it using Markdown."
    }
  ]
};

const expander = {
  text: "Make Longer",
  value: "expander",
  icon: "subject",
  messages: [
    {
      role: "system",
      content: "You are a ghost writer. Expand the content you are provided to create a full length written work. The provided text may already have typesetting applied in the form of Markdown or HTML tags. You must detect whether Markdown or HTML is used and your edits must remain consistent with the detected typesetting. If the text uses HTML, only use HTML tags already present in the copy given. You will need to improve the overall readability of what is provided as the provided content may just be a few notes and ideas. You will need to establish if the notes are for a blog post, web article, or something generic. Only reply with the edited version of the provided content. You will need to detect the language used and use that language."
    }
  ]
};

const microblog = {
  text: "Short Social Post",
  value: "microblog",
  icon: "tag",
  messages: [
    {
      role: "system",
      content: "You are a content marketer. Write a short and impactful summary of the content you are provided. The summary should be less than 280 characters long. The provided text may already have typesetting applied in the form of Markdown or HTML tags. You must detect whether Markdown or HTML is used to help with semantic understanding. Your generated summary should be written in plain text though without any markup. Only reply with the summary of the provided content. You will need to detect the language used and use that language."
    }
  ]
};

const seo = {
  text: "Create SEO Description",
  value: "seo",
  icon: "travel_explore",
  messages: [
    {
      role: "system",
      content: "You are a Search Engine Optimisation (SEO) Marketing Specialist. Identify the key words in the content you are provided and write a short summary of the content suitable for use in a description meta HTML tag. The summary should be less than 150 characters long. The provided text may already have typesetting applied in the form of Markdown or HTML tags. You must detect whether Markdown or HTML is used to help with semantic understanding. Your generated summary should be written in plain text though without any markup. Use best practices to target the keywords in the summary. Only reply with the summary of the provided content. You will need to detect the language used and use that language."
    }
  ]
};

const Prompts = {
  condenser,
  custom,
  editor,
  expander,
  microblog,
  seo
};

var app = defineOperationApp({
  id: "directus-labs-ai-writer-operation",
  name: "AI Writer",
  icon: "edit_square",
  description: "Use Anthropic, OpenAI, and Replicate APIs to generate text",
  overview: ({ model, promptKey, aiProvider }) => [
    {
      label: "AI  Provider",
      text: aiProvider
    },
    {
      label: "GPT Model",
      text: model
    },
    {
      label: "Prompt Type",
      text: promptKey
    }
  ],
  options: (context) => {
    const anthropicModels = [
      {
        text: "Claude 3.5 Sonnet",
        value: "claude-3-5-sonnet-20240620"
      },
      {
        text: "Claude 3 Opus",
        value: "claude-3-opus-20240229"
      },
      {
        text: "Claude 3 Haiku",
        value: "claude-3-haiku-20240307"
      }
    ];
    const openAiModels = [
      {
        text: "GPT-4o",
        value: "gpt-4o"
      },
      {
        text: "GPT-4o mini",
        value: "gpt-4o-mini"
      },
      {
        text: "GPT-4 Turbo",
        value: "gpt-4-turbo"
      },
      {
        text: "GPT-4",
        value: "gpt-4"
      },
      {
        text: "GPT-3.5 Turbo",
        value: "gpt-3.5-turbo"
      },
      {
        text: "O1 preview (Beta, requires access)",
        value: "o1-preview"
      },
      {
        text: "O1 mini (Beta, requires access)",
        value: "o1-mini"
      }
    ];
    const replicateModels = [
      {
        text: "Meta Llama 3.1-405b-instruct",
        value: "meta-llama-3.1-405b-instruct"
      },
      {
        text: "Mistral-7B-v0.1",
        value: "mistral-7b-v0.1"
      }
    ];
    const getModels = (provider) => {
      if (provider === "openai") {
        return openAiModels;
      }
      if (provider === "anthropic") {
        return anthropicModels;
      }
      if (provider === "replicate") {
        return replicateModels;
      }
      return [];
    };
    return [
      {
        field: "aiProvider",
        name: "AI Provider",
        type: "string",
        meta: {
          required: true,
          width: "full",
          interface: "select-dropdown",
          options: {
            choices: [
              {
                text: "Anthropic",
                value: "anthropic"
              },
              {
                text: "Open Ai",
                value: "openai"
              },
              {
                text: "Replicate (Meta & Mistral)",
                value: "replicate"
              }
            ]
          }
        }
      },
      {
        field: "apiKeyAnthropic",
        name: "Anthropic API Key",
        type: "string",
        meta: {
          required: context.aiProvider === "anthropic",
          options: {
            masked: true
          },
          width: "full",
          interface: "input",
          hidden: context.aiProvider !== "anthropic"
        }
      },
      {
        field: "apiKeyOpenAi",
        name: "OpenAi API Key",
        type: "string",
        meta: {
          required: context.aiProvider === "openai",
          options: {
            masked: true
          },
          width: "full",
          interface: "input",
          hidden: context.aiProvider !== "openai"
        }
      },
      {
        field: "apiKeyReplicate",
        name: "Replicate API Key",
        type: "string",
        meta: {
          required: context.aiProvider === "replicate",
          options: {
            masked: true
          },
          width: "full",
          interface: "input",
          hidden: context.aiProvider !== "replicate"
        }
      },
      {
        field: "model",
        name: "AI Model",
        type: "string",
        meta: {
          required: true,
          interface: "select-dropdown",
          options: {
            choices: getModels(context.aiProvider)
          },
          width: "half"
        }
      },
      {
        field: "maxToken",
        name: "Max Token",
        type: "integer",
        meta: {
          required: true,
          interface: "input",
          width: "half",
          note: "Based on the provider & model this will be either the total max token or the max complection tokens."
        },
        schema: {
          default_value: 1024
        }
      },
      {
        field: "promptKey",
        name: "Prompt",
        type: "string",
        required: true,
        meta: {
          interface: "select-dropdown",
          options: {
            choices: [
              Prompts.editor,
              Prompts.microblog,
              Prompts.expander,
              Prompts.condenser,
              Prompts.seo,
              Prompts.custom
            ]
          },
          width: "half"
        }
      },
      {
        field: "system",
        name: "Custom Prompt",
        type: "text",
        required: true,
        meta: {
          width: "full",
          interface: "textarea",
          hidden: context.promptKey !== Prompts.custom.value
        },
        schema: {
          default_value: "You are a cute little bunny called Directus that wants to help. You will act like a helpful assistant with your replies but always add some personality as if you were a bunny. Never break out of character."
        }
      },
      {
        field: "json_mode",
        name: "JSON Mode",
        type: "boolean",
        meta: {
          width: "full",
          hidden: context.promptKey !== Prompts.custom.value,
          note: "Always return a JSON object. Make sure your selected AI-Provider and model support JSON mode. See the [OpenAI docs on JSON mode](https://platform.openai.com/docs/guides/text-generation/json-mode) for more information."
        },
        schema: {
          default_value: false
        }
      },
      {
        field: "text",
        name: "Text",
        type: "text",
        required: true,
        meta: {
          width: "full",
          interface: "textarea"
        }
      },
      {
        field: "thread",
        name: "Messages",
        type: "json",
        meta: {
          width: "full",
          interface: "list",
          options: {
            fields: [
              {
                field: "role",
                name: "Role",
                type: "string",
                meta: {
                  interface: "select-dropdown",
                  options: {
                    choices: [
                      {
                        text: "System",
                        value: "system"
                      },
                      {
                        text: "Assistant",
                        value: "assistant"
                      },
                      {
                        text: "User",
                        value: "user"
                      }
                    ]
                  },
                  width: "full"
                }
              },
              {
                field: "content",
                name: "Message",
                type: "text",
                meta: {
                  interface: "textarea",
                  width: "full"
                }
              }
            ]
          },
          note: "Visit the [docs of the AI Writer Operation extension](https://github.com/directus-labs/extension-ai-writer-operation/blob/main/README.md) to learn how to use the Messages field"
        }
      }
    ];
  }
});

export { app as default };
