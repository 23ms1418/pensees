from AI.model import generate, tokenize, vocab_list


def generate_by_input(txt_input):
    return generate(tokenize(f"<soc>\nA: {txt_input}\nB: "))
