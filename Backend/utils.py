from flask import Flask
from flask import jsonify
from azure.cognitiveservices.search.imagesearch import ImageSearchClient
from msrest.authentication import CognitiveServicesCredentials
from processing import Phrases

subscription_key = "d3888707e03547d983cf64ec0530fb6a"


def keyword_ext(text):
	"""
	The function calls the get_phrases function and returns an array of phrases
	Input: String: text
	Return: Array: phrases
	"""
	p = Phrases()
	return p.get_phrases(text)

def FetchImage(search_term):
	"""
	The function uses Azure Cognitive Image Search API to query the search engine and return links of fetched images.
	Input: String: text
	Return: Array: phrases
	"""

    # Initializing client
	client = ImageSearchClient(credentials=CognitiveServicesCredentials(subscription_key),endpoint="https://eastus.api.cognitive.microsoft.com/")
    # Fetching image results
	image_results = client.images.search(query=search_term)
    # If images are fetched, we consider only the first image URL
	if image_results.value:
	    first_image_result = image_results.value[0]
	    return {'image_url': first_image_result.content_url, 'search_word': search_term, 'friendly': image_results.value[0].additional_properties['isFamilyFriendly'] }

	else:
	    print("No image results returned!")