import pandas as pd
from googletrans import Translator
translator = Translator()

def translate(x):
    try:
        en =  translator.translate(str(x)).text
        return en
    except:
        translator = Translator()
        en = translator.translate(str(x)).text
        return en
        
    
df = pd.read_csv('data.csv')
df_en = df.applymap(lambda x : translate(x))
columns_name_eng = list([translate(x) for x in list(df_en.columns)])
df_en.columns = columns_name_eng
df_en.to_csv('data_eng.csv')
print("Finish convert into english")