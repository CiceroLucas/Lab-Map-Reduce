import re
from multiprocessing import Pool

def map_function(file_chunk, pattern):
    matched_lines = []
    for line in file_chunk:
        if re.search(pattern, line):
            matched_lines.append(line)
    return matched_lines

def reduce_function(results):
    return [line for result in results for line in result]

def grep_distribuido(file_paths, pattern):
    file_chunks = []
    for file_path in file_paths:
        with open(file_path, 'r') as file:
            lines = file.readlines()
            file_chunks.append(lines)
    
    with Pool() as pool:
        results = pool.starmap(map_function, [(chunk, pattern) for chunk in file_chunks])
    
    final_result = reduce_function(results)
    
    return final_result

if __name__ == "__main__":
    file_paths = ['./files/arquivo1.txt', './files/arquivo2.txt']  
    pattern = input("Insira o padrão que deseja pesquisar: ") 

    matched_lines = grep_distribuido(file_paths, pattern)
    for line in matched_lines:
        print(line)
