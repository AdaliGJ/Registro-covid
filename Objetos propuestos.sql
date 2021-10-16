/*Objetos propuestos*/
/*Función*/
Create FUNCTION dias_vacuna(id_vacuna_p int, fecha_p date)
returns date
BEGIN
  
  declare fecha_v int;
  declare dias_v int;
  
  select dias_siguiente_dosis into dias_v from vacunas where id_vacuna = id_vacuna_p;
  
  set fecha_v = DATE_ADD(fecha_p, Interval dias_v DAY);
  
  return fecha_v;

END;

/*Trigger*/
 CREATE TRIGGER asignar_fecha BEFORE UPDATE ON datos_registro
   	FOR EACH ROW
   	BEGIN
        Declare dosis_v int;
        Declare vacuna_v int;
        
        select NEW.vacuna into vacuna_v;
        
        select dosis into dosis_v from vacunas where id_vacuna = vacuna_v;
        
        IF dosis_v = 2 AND NEW.primera_dosis = 1 THEN
           SET NEW.fecha_segunda_dosis = dias_vacuna(vacuna_v, OLD.fecha_primera_dosis);
        ELSEIF dosis_v = 3 THEN
          IF NEW.primera_dosis = 1 THEN
            SET NEW.fecha_segunda_dosis = dias_vacuna(vacuna_v, OLD.fecha_primera_dosis);
          ELSEIF OLD.primera_dosis = 1  AND NEW.segunda_dosis = 1 THEN
            SET NEW.fecha_tercera_dosis = dias_vacuna(vacuna_v, OLD.fecha_segunda_dosis);
          END IF;
        END IF;
        
    END;
    
    
    
    /*Procedimiento*/
    CREATE PROCEDURE nuevo_registro(IN dpi_p bigint, tel1_p int, tel2_p int, email1_p varchar(50), email2_p varchar(50), centro_p int)
BEGIN 
	Declare counttel int;
  Declare countemail int;
  Declare tel1_v int;
  Declare tel2_v int;
  Declare email1_v varchar(50);
  Declare email2_v varchar(50);
  
  select correo into email1_v from correos where dpi_persona=dpi_p order by correo desc limit 1;
  select correo into email2_v from correos where dpi_persona=dpi_p order by correo asc limit 1;
  
  select telefono into tel1_v from telefonos where dpi_persona=dpi_p order by telefono desc limit 1;
  select telefono into tel2_v from telefonos where dpi_persona=dpi_p order by telefono asc limit 1;
  
  INSERT INTO datos_registro
  (dpi_persona, puesto_registro, primera_dosis, segunda_dosis, tercera_dosis )/*, fecha_primera_dosis, primera_dosis)*/
  VALUES 
  (dpi_p, centro_p, 0, 0, 0);/*, DATE_FORMAT(CONCAT(YEAR(now()), '-', MONTH(now())+1, '-', DAY(now())), '%Y-%m-%d'),0);*/
  
  Select count(*) into countemail from correos where dpi_persona=dpi_p;
  Select count(*) into counttel from telefonos where dpi_persona=dpi_p;
  
  IF counttel = 2 THEN
    UPDATE telefonos SET telefono = tel1_p where telefono=tel1_v;
    IF tel2_p IS NOT NULL AND tel2_p != 0 THEN
      UPDATE telefonos SET telefono = tel2_p where telefono=tel2_v;
    END IF;
  ELSEIF counttel = 1 THEN
    UPDATE telefonos SET telefono = tel1_p where telefono=tel1_v;
    IF tel2_p IS NOT NULL AND tel2_p != 0 THEN
      INSERT INTO telefonos (telefono, dpi_persona) Values (tel2_p, dpi_p);
    END IF;
  ELSE
    IF tel1_p IS NOT NULL AND tel1_p != 0 THEN
      INSERT INTO telefonos (telefono, dpi_persona) Values (tel1_p, dpi_p);
    END IF;
    IF tel2_p IS NOT NULL AND tel2_p != 0 THEN
      INSERT INTO telefonos (telefono, dpi_persona) Values (tel2_p, dpi_p);
    END IF;
  END IF;
  
  IF countemail = 2 THEN
    UPDATE correos SET correo = email1_p where correo=email1_v;
    IF email2_p IS NOT NULL AND email2_p != '' THEN
      UPDATE correos SET correo = email2_p where correo=email2_v;
    END IF;
  ELSEIF countemail = 1 THEN
    UPDATE correos SET correo = email1_p where correo=email1_v;
    IF email2_p IS NOT NULL AND email2_p != '' THEN
      INSERT INTO correos (correo, dpi_persona) Values (email2_p, dpi_p);
    END IF;
  ELSE
    IF email1_p IS NOT NULL AND email1_p != '' THEN
      INSERT INTO correos (correo, dpi_persona) Values (email1_p, dpi_p);
    END IF;
    IF email2_p IS NOT NULL AND email2_p != '' THEN
      INSERT INTO correos (correo, dpi_persona) Values (email2_p, dpi_p);
    END IF;
  END IF;
     
           	 
 COMMIT;


END;

/*Vista 1*/
CREATE VIEW reportes_centro AS
 select fecha_primera_dosis fecha_dosis, puesto_registro, nombre_centro(dpi_persona) nombre_centro, vacuna, nombre_vacuna(vacuna) nombre_vacuna, dpi_persona, genero_persona(dpi_persona) genero, 'primera' dosis_aplicada from datos_registro where primera_dosis = 1
 union 
 select fecha_segunda_dosis fecha_dosis,  puesto_registro, nombre_centro(dpi_persona) nombre_centro, vacuna, nombre_vacuna(vacuna) nombre_vacuna, dpi_persona, genero_persona(dpi_persona) genero, 'segunda' dosis_aplicada from datos_registro where segunda_dosis = 1
 union
 select fecha_tercera_dosis fecha_dosis,  puesto_registro, nombre_centro(dpi_persona) nombre_centro, vacuna, nombre_vacuna(vacuna) nombre_vacuna, dpi_persona, genero_persona(dpi_persona) genero, 'tercera' dosis_aplicada from datos_registro where tercera_dosis = 1
 order by puesto_registro desc, fecha_dosis desc;
 
/*Vista 2*/
CREATE VIEW info_usuarios AS
  select p.*, dr.*, nombre_centro(dpi) centro, enfermedad(dpi) enfermedad, nombre_vacuna(dr.vacuna) nombre_vacuna, tipo_usuario(dpi) tipo_usuario, tel2_persona(dpi) tel2, tel1_persona(dpi) tel1, correo1_persona(dpi) email1, correo2_persona(dpi) email2, profesion_persona(dpi) profesion from poblacion p inner join datos_registro dr on p.dpi = dr.dpi_persona;
    