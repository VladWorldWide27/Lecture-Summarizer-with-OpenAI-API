import { Configuration, OpenAIApi } from 'openai';

class OpenAi {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system'
    };

    constructor(apiKey) {
        const configuration = new Configuration({ apiKey });
        this.openai = new OpenAIApi(configuration);
    }

    async chat(messages) {
        try {
            const response = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages
            });
            return response.data.choices[0].message;
        } catch (e) {
            console.log('Error while chatting with GPT', e.message);
        }
    }

    async transcription(filepath) {
        try {
            const response = await this.openai.createTranscription(
                createReadStream(filepath),
                'whisper-1'
            );
            return response.data.text;
        } catch (e) {
            console.log('Error while transcribing', e.message);
        }
    }
}

export const openai = new OpenAi(config.get("OPENAI_KEY"));
