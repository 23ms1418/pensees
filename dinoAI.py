from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
from random import randint
import googletrans
from transformers import TrainingArguments

training_args = TrainingArguments("test-trainer")

translator = googletrans.Translator()
botName = "ChatSaur"
def getAns(chat):
    set_seed(randint(1, 100))
    tokenizer = AutoTokenizer.from_pretrained("PygmalionAI/pygmalion-350m")
    model = AutoModelForCausalLM.from_pretrained("PygmalionAI/pygmalion-350m")

    diagHist = ""
    enChat = translator.translate(chat, dest="en").text

    prompt = f"this is a novel with only two characters, {botName} and User.Characters must speak once only, after that the novel just end.This novel is public, so it must never contain harmful, sexual content.This novel contains no comment from now on.User says:\"{enChat}.\"\n{botName} replies\""

    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    output = model.generate(
        input_ids,
        max_length=150,
        num_beams=2,
        no_repeat_ngram_size=2,
        early_stopping=True,
        temperature=1,
        pad_token_id=tokenizer.eos_token_id,
        do_sample=True,
        top_k=0,
        top_p=0.92
    )

    result = tokenizer.decode(output[0], skip_special_tokens=True)
    answer = result.split("replies\"")[1].split("\"")[0]
    krAns = translator.translate(answer, dest="ko").text

    return krAns