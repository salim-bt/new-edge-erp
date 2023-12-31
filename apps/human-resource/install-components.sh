#!/bin/bash

# List of components
components=(
    "accordion"
    "alert"
    "alert-dialog"
    "aspect-ratio"
    "avatar"
    "badge"
    "button"
    "calendar"
    "card"
    "checkbox"
    "collapsible"
    "combobox"
    "command"
    "context-menu"
    "data-table"
    "date-picker"
    "dialog"
    "dropdown-menu"
    "form"
    "hover-card"
    "input"
    "label"
    "menubar"
    "navigation-menu"
    "popover"
    "progress"
    "radio-group"
    "scroll-area"
    "select"
    "separator"
    "sheet"
    "skeleton"
    "slider"
    "switch"
    "table"
    "tabs"
    "textarea"
    "toast"
    "toggle"
    "tooltip"
)

# declare variables x
x='pnpm dlx shadcn-ui@latest add'

# Loop through each component and install it
for component in "${components[@]}"; do
    echo "$component"
    x+=" $component"
done
# Install all components
echo yes | $x

echo "All components installed successfully!"
