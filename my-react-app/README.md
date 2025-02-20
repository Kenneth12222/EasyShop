/* AdminPanel.css */

/* Base Variables for Theme Consistency */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background-color: #f7f7f7;
    --card-background: #ffffff;
    --header-background: #ffffff;
    --border-color: #e3e6f0;
    --btn-add-bg: #28a745;
    --btn-add-bg-hover: #218838;
    --btn-edit-bg: #ffc107;
    --btn-edit-bg-hover: #e0a800;
    --btn-delete-bg: #dc3545;
    --btn-delete-bg-hover: #c82333;
    --table-header-bg: #007bff;
    --table-header-color: #ffffff;
    --text-color: #333;
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --transition-speed: 0.3s;
  }
  
  /* Overall Admin Panel Container */
  .admin-panel {
    max-width: 1200px;
    margin: 40px auto;
    padding: 30px;
    background-color: var(--background-color);
    border-radius: 12px;
    font-family: var(--font-family);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    color: var(--text-color);
  }
  
  /* Header Styles */
  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: var(--header-background);
    border-bottom: 2px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .admin-header h1 {
    font-size: 2rem;
    margin: 0;
    color: var(--primary-color);
  }
  
  /* Add Button */
  .btn-add {
    padding: 10px 20px;
    background-color: var(--btn-add-bg);
    border: none;
    color: #fff;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color var(--transition-speed) ease,
                box-shadow var(--transition-speed) ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .btn-add:hover {
    background-color: var(--btn-add-bg-hover);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Table Container for Responsiveness */
  .admin-table-container {
    overflow-x: auto;
  }
  
  /* Table Styles */
  .admin-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--card-background);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .admin-table thead {
    background-color: var(--table-header-bg);
  }
  
  .admin-table thead th {
    padding: 16px 20px;
    text-align: left;
    font-size: 1rem;
    color: var(--table-header-color);
    border-bottom: 2px solid var(--border-color);
  }
  
  .admin-table tbody tr {
    transition: background-color var(--transition-speed) ease;
  }
  
  .admin-table tbody tr:nth-child(even) {
    background-color: #f8f9fc;
  }
  
  .admin-table tbody tr:hover {
    background-color: #f1f3f8;
  }
  
  .admin-table td {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color);
    font-size: 0.95rem;
    vertical-align: middle;
  }
  
  /* Product Thumbnail */
  .product-thumbnail {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Action Buttons */
  .btn-edit,
  .btn-delete {
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color var(--transition-speed) ease,
                transform var(--transition-speed) ease;
    margin-right: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .btn-edit {
    background-color: var(--btn-edit-bg);
    color: #fff;
  }
  
  .btn-edit:hover {
    background-color: var(--btn-edit-bg-hover);
    transform: translateY(-2px);
  }
  
  .btn-delete {
    background-color: var(--btn-delete-bg);
    color: #fff;
  }
  
  .btn-delete:hover {
    background-color: var(--btn-delete-bg-hover);
    transform: translateY(-2px);
  }
  