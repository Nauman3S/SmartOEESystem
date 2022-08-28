

void setupPhotoSensor(void)
{

    pinMode(18, INPUT);
}

String getPhotoSensor()
{

    /* Get new sensor events with the readings */

    String dataV = "";

    dataV = String(digitalRead(18));

    return dataV;
}