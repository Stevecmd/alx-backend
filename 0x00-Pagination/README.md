# 0x00. Pagination
## Resources
1. [REST API Design: Pagination](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/#pagination)
2. [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)

## Learning Objectives

- How to paginate a dataset with simple page and page_size parameters
- How to paginate a dataset with hypermedia metadata
- How to paginate in a deletion-resilient manner

### Setup: 

use this data file `Popular_Baby_Names.csv` for the project

# Tasks
0. Simple helper function

Write a function named `index_range` that takes two integer arguments `page` and `page_size`. <br />

The function should return a tuple of size two containing a start index and an end index corresponding to the range of indexes to return in a list for those particular pagination parameters. <br />

Page numbers are 1-indexed, i.e. the first page is page 1. <br />

```sh

bob@dylan:~$ cat 0-main.py
#!/usr/bin/env python3
"""
Main file
"""

index_range = __import__('0-simple_helper_function').index_range

res = index_range(1, 7)
print(type(res))
print(res)

res = index_range(page=3, page_size=15)
print(type(res))
print(res)

bob@dylan:~$ ./0-main.py
<class 'tuple'>
(0, 7)
<class 'tuple'>
(30, 45)

```

File: `0-simple_helper_function.py`

1. Simple pagination






File: `1-simple_pagination.py`

2. Hypermedia pagination














File: `2-hypermedia_pagination.py`

3. Deletion-resilient hypermedia pagination











File: `3-hypermedia_del_pagination.py`
