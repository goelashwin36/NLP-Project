import string
from collections import Counter, defaultdict
from itertools import chain, groupby, product

import nltk
from nltk.tokenize import wordpunct_tokenize


class Phrases(object):
    def __init__(
        self,
        stopwords=None,
        punctuations=None,
        language="english",
        max_length=10,
        min_length=1,
    ):

        # If stopwords not provided we use language stopwords by default.
        self.stopwords = stopwords
        if self.stopwords is None:
            self.stopwords = nltk.corpus.stopwords.words(language)

        # If punctuations are not provided we ignore all punctuation symbols.
        self.punctuations = punctuations
        if self.punctuations is None:
            self.punctuations = string.punctuation

        # All things which act as sentence breaks during keyword extraction.
        self.words_to_ignore = set(chain(self.stopwords, self.punctuations))

        # Assign min or max length to the attributes
        self.min_length = min_length
        self.max_length = max_length

    def get_phrases(self, text):
        """
        Driver function to convert the sentence into
        Input: Text string
        Returns: A list of tuples of phrases
        """
        # Sentence Tokenization
        sentences = nltk.tokenize.sent_tokenize(text)
        # Getting a list of phrases
        phrase_list = self.generate_phrases(sentences)
        return phrase_list[0]

    def generate_phrases(self, sentences):
        phrase_list = list()
        # Create phrases from all the sentences.
        for sentence in sentences:
            # Removing the word punctuations and converting to lower case
            word_list = [word.lower() for word in wordpunct_tokenize(sentence)]

            # Get
            phrase_list.append(self._get_phrase_list_from_words(word_list))
        return phrase_list

    def _get_phrase_list_from_words(self, word_list):
        # Phrases are grouped on the basis of stopwords.
        # Stop words act as a delimiters
        groups = groupby(word_list, lambda x: x not in self.words_to_ignore)
        phrases = [tuple(group[1]) for group in groups if group[0]]
        # If the number of words in a phrase extend he max_length then it is ignored
        return list(
            filter(lambda x: self.min_length <= len(x) <= self.max_length, phrases)
        )
