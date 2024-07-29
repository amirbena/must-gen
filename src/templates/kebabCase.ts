function toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')  // Insert hyphen between lowercase and uppercase letters
      .toLowerCase();  // Convert the entire string to lowercase
  }