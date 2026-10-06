import os
import re

colors_ts_content = '''export const COLORS = {
  primary: '#00796B',
  primaryDark: '#005b50',
  primaryLight: '#E0F2F1',

  white: '#FFFFFF',
  black: '#000000',

  text: '#333333',
  textLight: '#666666',
  textMuted: '#888888',
  textDark: '#444444',

  background: '#FFFFFF',
  backgroundLight: '#FAFAFA',
  backgroundCard: '#F9FAFB',
  inputBackground: '#F5F5F5',

  border: '#D9E1E1',
  borderLight: '#EEEEEE',
  borderMedium: '#E0E0E0',
  borderDivider: '#F0F0F0',

  error: '#D32F2F',
  errorDark: '#E53935',
  errorLight: '#FFEBEE',
  warning: '#F5B041',
  warningBackground: '#FFF9E6',
  star: '#FFD700',
  starDark: '#FBC02D',

  gray: '#A0A0A0',
  grayLight: '#CCCCCC',
  textSecondary: '#555555',

  success: '#2E7D32',
  successLight: '#E8F5E9',
  successBorder: '#C8E6C9',
  successDark: '#43A047',
  
  info: '#1976D2',
  infoLight: '#F0F8FF',
  infoSecondary: '#1565C0',
  infoBackground: '#E3F2FD',

  orange: '#FF7043',
  orangeLight: '#FFF3E0',
  orangeDark: '#E65100',
  
  tealMedium: '#009688',
  tealDark: '#00897B',
  tealLight: '#E8F3F1',
};
'''

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\constants\colors.ts', 'w', encoding='utf-8') as f:
    f.write(colors_ts_content)

color_mapping = {
    '#000': 'COLORS.black',
    '#888': 'COLORS.textMuted',
    '#ffd700': 'COLORS.star',
    '#ccc': 'COLORS.grayLight',
    '#e53935': 'COLORS.errorDark',
    '#fff9e6': 'COLORS.warningBackground',
    '#ff7043': 'COLORS.orange',
    '#e0e0e0': 'COLORS.borderMedium',
    '#e8f5e9': 'COLORS.successLight',
    '#fff3e0': 'COLORS.orangeLight',
    '#2e7d32': 'COLORS.success',
    '#e65100': 'COLORS.orangeDark',
    '#f0f0f0': 'COLORS.borderDivider',
    '#444': 'COLORS.textDark',
    '#999': 'COLORS.textMuted',
    '#009688': 'COLORS.tealMedium',
    '#fbc02d': 'COLORS.starDark',
    '#c8e6c9': 'COLORS.successBorder',
    '#333': 'COLORS.text',
    '#777': 'COLORS.textMuted',
    '#00897b': 'COLORS.tealDark',
    '#ffebee': 'COLORS.errorLight',
    '#43a047': 'COLORS.successDark',
    '#1976d2': 'COLORS.info',
    '#f0f8ff': 'COLORS.infoLight',
    '#e8f3f1': 'COLORS.tealLight',
    '#1565c0': 'COLORS.infoSecondary',
    '#e3f2fd': 'COLORS.infoBackground'
}

def replace_colors_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    def repl(match):
        quote = match.group(1)
        hex_val = match.group(2).lower()
        full_hex = f'#{hex_val}'
        if full_hex in color_mapping:
            return color_mapping[full_hex]
        return match.group(0) # return original if not found

    # Regex to match '#hex' or "#hex"
    pattern = r"(['\"])(#[A-Fa-f0-9]{3,6})\1"
    content = re.sub(pattern, repl, content)

    if content != original_content:
        # Check if COLORS is imported
        if 'COLORS' in content and 'constants/colors' not in content:
            # Add import
            depth = filepath.replace('\\', '/').split('/src/')[1].count('/')
            import_path = '../' * depth + 'constants/colors'
            if depth == 0: import_path = './constants/colors'
            import_stmt = f"import {{ COLORS }} from '{import_path}';\n"
            
            # Insert after last import
            last_import = content.rfind('import ')
            if last_import != -1:
                end_of_line = content.find('\n', last_import)
                content = content[:end_of_line+1] + import_stmt + content[end_of_line+1:]
            else:
                content = import_stmt + content

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('c:/Users/Priya/Desktop/New folder/Healthcare/src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            if file == 'colors.ts': continue
            filepath = os.path.join(root, file)
            replace_colors_in_file(filepath)
