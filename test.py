from tokenizer import tokenizer
from transformers import BertConfig, BertModel
from transformers import BertModel, AutoTokenizer

model = BertModel.from_pretrained("bert-base-cased")
tokenizer = AutoTokenizer.from_pretrained("PygmalionAI/pygmalion-350m")

input_ids = tokenizer.encode("hi", return_tensors="pt")

output = model.generate(input_ids)

result = tokenizer.decode(output[0], skip_special_tokens=True)

