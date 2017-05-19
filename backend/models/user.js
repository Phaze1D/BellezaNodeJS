/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(127),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: '0'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};


// public static $error_messages = [
//         'required' => 'Necesario',
//         'email' => 'El correo electrónico tiene que ser válida.',
//         'min' => 'Debe tener como mínimo :min caracteres',
//         'max' => 'Debe tener como maximo :max caracteres',
//         'email.unique' => 'El correo electrónico ya esta registrado',
//         'password.confirmed' => 'Por favor confirmar tu contraseña'
//     ];
//
//
//     public static function create_rules()
//     {
//         return [
//         'email' => 'required|email|max:45|unique:users,email',
//         'password' => 'required|confirmed|min:6',
//         'first_name' => 'required|max:45',
//         'last_name' => 'required|max:45'
//         ];
//     }
//
//     public static function update_rules($id)
//     {
//         return [
//         'email' => 'required|email|max:45|unique:users,email,'.$id,
//         'first_name' => 'required|max:45',
//         'last_name' => 'required|max:45'
//         ];
//     }
