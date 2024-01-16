from django.shortcuts import HttpResponse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from AI.main import vocab_list, generate_by_input


@csrf_exempt
def chat(req):
    if req.method != 'POST':
        return HttpResponse("no")
    try:
        parsed_data = json.loads(req.body.decode('utf-8'))
        response_data = {"answer": generate_by_input(parsed_data["chat"])}
        return JsonResponse(response_data)
    except json.JSONDecodeError as e:
        print(f'Error decoding JSON: {e}')


@csrf_exempt
def autocomplete(req):
    if req.method != 'POST':
        return HttpResponse("no")
    try:
        parsed_data = json.loads(req.body.decode('utf-8'))
        c = parsed_data["content"]

        available = []
        for vocab in vocab_list:
            if c in vocab and is_valid_vocab(vocab):
                available.append(vocab)

        response_data = {"available": available}

        return JsonResponse(response_data)
    except json.JSONDecodeError as e:
        print(f'Error decoding JSON: {e}')


def is_valid_vocab(vocab):
    if "(" in vocab:
        return False
    if "[" in vocab:
        return False
    return True
